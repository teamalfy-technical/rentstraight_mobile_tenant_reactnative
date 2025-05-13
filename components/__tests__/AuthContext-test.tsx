import { AuthProvider, useAuth } from "@/context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import { Pressable, Text } from "react-native"
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'

const AuthContextComponent = () => {
const { login, logout, updateUser, user } = useAuth()
    return (
        <>
        <Pressable onPress={() => login('user@example.com', 'password')}>login</Pressable>
        <Pressable onPress={logout}>logout</Pressable>
        <Pressable onPress={() => updateUser({name: 'user@example.com'})}>Update User</Pressable>
        { user && <Text>{user.name}</Text>}
        </>
    )
}
describe('Authentication suite', () => {
    beforeEach(() => {
        AsyncStorage.clear()
    });

    it('should log user in and save details', async () => {
        const mockUser = { name: "Joseph", email: 'user@example.com', username: "mockuser", token: "mocktoken", phone_number: "", avatar: ""};
        (axios.post as jest.Mock).mockResolvedValueOnce({ status: 200, data: {data: mockUser }});

        render(
            <AuthProvider>
                <AuthContextComponent />
            </AuthProvider>
        );

        fireEvent.press(screen.getByText('Login'))

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
            expect(screen.getByText('Test User')).toBeTruthy();
        })
    });
})