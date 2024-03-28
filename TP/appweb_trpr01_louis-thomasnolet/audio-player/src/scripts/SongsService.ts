import axios, { AxiosResponse } from 'axios';

const SONGS_PATH = '/songs';
const ARTISTS_PATH = '/artists';

interface Song {
  id: number;
  fileName: string;
  songName: string;
  desc: string;
  infosUrl: string;
  artistId: number;
}

interface Artist {
  id: number;
  name: string;
  desc: string;
}

export default class SongsService {
  private API_URL: string;

  constructor() {
    this.API_URL = 'http://localhost:3000';
  }

  async getSongs(): Promise<Song[]> {
    try {
      const response: AxiosResponse<Song[]> = await axios.get(this.API_URL + SONGS_PATH);
      return response.data;
    } catch (error) {
      console.error('Error getting songs:', error);
      throw error;
    }
  }

  async getSong(songId: number): Promise<Song> {
    try {
      const response: AxiosResponse<Song> = await axios.get(this.API_URL + SONGS_PATH + '/' + songId);
      return response.data;
    } catch (error) {
      console.error('Error getting song:', error);
      throw error;
    }
  }

  async getArtists(): Promise<Artist[]> {
    try {
      const response: AxiosResponse<Artist[]> = await axios.get(this.API_URL + ARTISTS_PATH);
      return response.data;
    } catch (error) {
      console.error('Error getting artists:', error);
      throw error;
    }
  }
}
