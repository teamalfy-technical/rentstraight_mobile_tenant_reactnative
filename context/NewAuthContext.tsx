import { apiKey, publicUrl } from "@/app/api/baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Alert } from "react-native";

interface userProps {
  name: string;
  email: string;
  contactName: string;
  avatar: string;
  phone: string;
  token: string;
  propertyId: string;
  unitNumber: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: string;
  securityDeposit: string;
  status: string;
  password: string;
  password_confirmation: string;
}

interface AuthContextProps {
  loading: boolean;
  token: string | null;
  user: userProps | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<userProps>) => Promise<void>;
  setUser: Dispatch<SetStateAction<userProps | null>>;
  handleChange: (field: keyof userProps, value: string) => void;
  register: (data: Partial<userProps>) => Promise<void>;
  registerStatus: {
    isPending: boolean;
    isError: boolean;
    error: unknown;
  };
  loginStatus: {
    isPending: boolean;
    isError: boolean;
    error: unknown;
  };
  updateStatus: {
    isPending: boolean;
    isError: boolean;
    error: unknown;
  };
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const NewAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userProps | null>(null);
  const queryClient = useQueryClient();

  const fetchUser = async (): Promise<userProps | null> => {
    const storedToken = await AsyncStorage.getItem("token");
    const storedUser = await AsyncStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      return parsedUser;
    }

    return null;
  };

  const { data, isLoading: loading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post(
        `${publicUrl}/tenant/login/`,
        { email, password },
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data;
    },
    onSuccess: async (data) => {
      const token = data.token;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setToken(token);
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      Alert.alert(
        "Error",
        err.response?.data?.message ||
          "Something went wrong, please try again..."
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: Partial<userProps>) => {
      console.log(data, "new auth context");
      const res = await axios.post(`${publicUrl}/tenant/register`, data, {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onSuccess: async (data) => {
      console.log(data, "data after login");
      router.push("/signup/otp");
    },
    onError: (err: any) => {
      console.log(err, "error registering");
      throw err;
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (data: Partial<userProps>) => {
    await registerMutation.mutateAsync(data);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setToken(null);
    setUser(null);
    await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    router.replace("/(auth)");
  };

  const updateMutation = useMutation({
    mutationFn: async (userData: Partial<userProps>) => {
      const updated = { ...user, ...userData };
      await AsyncStorage.setItem("user", JSON.stringify(updated));
      return updated;
    },
    onSuccess: (updated) => {
      setUser(updated as userProps);
      queryClient.setQueryData(["authUser"], updated);
    },
  });

  const updateUser = async (userData: Partial<userProps>) => {
    await updateMutation.mutateAsync(userData);
  };

  const handleChange = (field: keyof userProps, value: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [field]: value };
      AsyncStorage.setItem("user", JSON.stringify(updated)); // Persist change
      queryClient.setQueryData(["authUser"], updated); // Update query cache
      return updated;
    });
  };

  const loginStatus = {
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };

  const registerStatus = {
    isPending: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
  };

  const updateStatus = {
    isPending: updateMutation.isPending,
    isError: updateMutation.isError,
    error: updateMutation.error,
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        token,
        user,
        login,
        logout,
        updateUser,
        setUser,
        handleChange,
        register,
        registerStatus,
        loginStatus,
        updateStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useNewAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useNewAuth must be used with a provider");
  }

  return context;
};
