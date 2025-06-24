import { useAuth } from "@/context/AuthContext";
import { baseurl, publicUrl } from "./baseurl";
import axios from "axios";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { router } from "expo-router";

export const useGetProperties = () => {
  const { user } = useAuth();

  const getProperties = async () => {
    const res = await axios.get(`${publicUrl}/properties`, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useInfiniteQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
    enabled: !!user?.token,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const currentPage = pagination.page;
      const totalItems = pagination.total;
      const limit = pagination.limit;

      const totalPages = Math.ceil(totalItems / limit);

      // If there's a next page, return the next page number
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.properties),
  });
};

export const useGetPropertyDetails = (id: string) => {
  const getPropertyDetails = async () => {
    const res = await axios.get(`${publicUrl}/properties/${id}`, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useQuery({
    queryKey: ["property-details", id],
    queryFn: getPropertyDetails,
    enabled: !!id,
  });
};

export const useUpdateProperty = (id: string) => {
  const updateProperty = async (data: any) => {
    const res = await axios.put(`${publicUrl}/properties/${id}`, data, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useMutation({
    mutationFn: updateProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.log(error, "error from update property");
      throw error;
    },
  });
};

export const useDeleteProperty = (id: string) => {
  const deleteProperty = async () => {
    const res = await axios.delete(`${publicUrl}/properties/${id}`, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.log(error, "error from delete property");
      throw error;
    },
  });
};

export const useCreateProperty = () => {
  const createProperty = async (data: any) => {
    console.log(data, "data");
    const res = await axios.post(
      `${publicUrl}/properties`,
      { ...data, totalUnits: 1 },
      {
        headers: {
          "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.data;
  };
  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      router.push("/");
    },
    onError: (error) => {
      console.log(error, "error from create property");
      throw error;
    },
  });
};

export const useGetAllTenants = () => {
  const { user } = useAuth();
  const getAllTenants = async () => {
    const res = await axios.get(`${publicUrl}/tenants`, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useInfiniteQuery({
    queryKey: ["all-tenants"],
    queryFn: getAllTenants,
    enabled: !!user?.token,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const currentPage = pagination.page;
      const totalItems = pagination.total;
      const limit = pagination.limit;

      const totalPages = Math.ceil(totalItems / limit);

      // If there's a next page, return the next page number
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useCreateTenant = () => {
  const createTenant = async (data: any) => {
    const res = await axios.post(`${publicUrl}/tenants`, data, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tenants"] });
    },
    onError: (error) => {
      console.log(error, "error from create tenant");
      throw error;
    },
  });
};

export const useUpdateTenant = (id: string) => {
  const updateTenant = async (data: any) => {
    const res = await axios.put(`${publicUrl}/tenants/${id}`, data, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useMutation({
    mutationFn: updateTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tenants"] });
    },
    onError: (error) => {
      console.log(error, "error from update tenant");
      throw error;
    },
  });
};

export const useDeleteTenant = (id: string) => {
  const deleteTenant = async () => {
    const res = await axios.delete(`${publicUrl}/tenants/${id}`, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tenants"] });
    },
  });
};

export const useGetTenantDetails = (id: string) => {
  const getTenantDetails = async () => {
    const res = await axios.get(`${publicUrl}/tenants/${id}`, {
      headers: {
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe",
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  };
  return useQuery({
    queryKey: ["tenant-details", id],
    queryFn: getTenantDetails,
    enabled: !!id,
  });
};
