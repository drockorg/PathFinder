import React from 'react';
import { api } from '../store/services/api';

export function ConnectionTest() {
  const { data, error, isLoading } = api.useTestConnectionQuery();

  if (isLoading) return <div>Testing connection...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <div>Success: {data.message}</div>;

  return null;
}