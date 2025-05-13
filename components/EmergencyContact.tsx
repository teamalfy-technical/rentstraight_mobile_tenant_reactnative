import React, { useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Select } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomInput } from './CustomInput';

const EmergencyContact = () => {
  const [values, setValues] = useState({
    gender: '',
    nickname: '',
    relation: '',
    image: '',
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValues({ ...values, image: result.assets[0].base64 });
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['50%', '80%']}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Emergency Contact</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <Pressable onPress={pickImage}>
              <View style={styles.imageContainer}>
                <MaterialCommunityIcons
                  name="image-plus"
                  size={40}
                  color="gray"
                />
                {values.image && (
                  <Image
                    source={{ uri: `data:image/png;base64,${values.image}` }}
                    style={styles.image}
                  />
                )}
              </View>
            </Pressable>

            <CustomInput
              label="Name"
              value={values.nickname}
              onChange={(text) => setValues({ ...values, nickname: text })}
            />

            <CustomInput
              label="Relation"
              value={values.relation}
              onChange={(text) => setValues({ ...values, relation: text })}
            />

            <Select
              selectedValue={values.gender}
              onValueChange={(itemValue) =>
                setValues({ ...values, gender: itemValue })
              }
            >
              <Select.Item label="Male" value="male" />
              <Select.Item label="Female" value="female" />
            </Select>

            <CustomInput label="Mobile" value="" onChange={() => {}} />
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    zIndex: 10,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
});

export default EmergencyContact;
