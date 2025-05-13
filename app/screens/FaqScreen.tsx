import TopBack from "@/components/TopBack"
import { Select } from "native-base"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const FaqScreen = () => {
    return (
        <SafeAreaView>
            <TopBack />

            <View>
                <Text style={{fontFamily: 'montAlt'}} className="text-[#111111] text-[32px]">FAQ's</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="rounded-[15px] bg-[#F5E2C8] w-full">
                    <Select placeholder="What is rentstraight" w={'full'}>
                        <Select.Item label="Item 1" value="1"/>
                    </Select>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FaqScreen