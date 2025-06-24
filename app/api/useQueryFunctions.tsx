// src/hooks/useQueries.js
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { baseurl } from '@/app/api/baseurl';

export const useFetchProperties = () => {
  const { user } = useAuth();

  const fetchProperties = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${baseurl}/properties?page=${pageParam}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-user-account-type': 'tenant',
      },
    });
    return res.data.data;
  };

  return useInfiniteQuery({
    queryKey: ['properties', user?.token],
    queryFn: fetchProperties,
    enabled: !!user?.token,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.next_page_url) {
        return allPages.length + 1; // Next page number
      }
      return undefined; // No more pages
    },
    select: (data) => data.pages.flatMap((page) => page.data || []),
  });
};

export const useFetchProfile = () => {
  const { user } = useAuth();

  const fetchProfile = async () => {
    const res = await axios.get(`${baseurl}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
        'x-user-account-type': 'tenant',
      },
    });
    return res.data.data;
  };

  return useQuery({
    queryKey: ['profile', user?.token],
    queryFn: fetchProfile,
    enabled: !!user?.token,
  });
};

export const useResendEmail = () => {
  const { user } = useAuth();

  const resendEmail = async () => {
    const res = await axios.post(`${baseurl}/email/resend-verification-token/`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
        'x-user-account-type': 'tenant',
      },
    });
    return res.data;
  };

  return useMutation({
    mutationKey: ['resend-email', user?.token],
    mutationFn: resendEmail,
  });
};
