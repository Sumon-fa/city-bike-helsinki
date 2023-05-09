import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { GetAllJourneys } from '../../types/journey'
import axiosInstance from '../../common/axiosInstance'

export const getAllJourneys = createAsyncThunk(
  'getAlljourneys',
  async (filter: { title: string; pageNumber: number }, thunkApi) => {
    try {
      const pageSize = 8
      let link = '/api/v1/journeys'
      if (filter) {
        link = `/api/v1/journeys?page=${filter.pageNumber}&pageSize=${pageSize}&searchKeyWord=${filter.title}`
      }

      const response: AxiosResponse<GetAllJourneys, GetAllJourneys> = await axiosInstance.get(link)
      return response.data
    } catch (err: any) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
)
