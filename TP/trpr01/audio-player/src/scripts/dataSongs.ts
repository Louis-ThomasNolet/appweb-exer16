import axios, { AxiosResponse } from 'axios';

const SONG_PATH = '/songs';
const ARTIST_PATH = '/artists';

export default class SongService {
    private API_URL: string;

    constructor() {
        this.API_URL = 'http://localhost:3000';
    }

    async getSongs(): Promise<any[]> {
        const response: AxiosResponse<any[]> = await axios.get(this.API_URL + SONG_PATH);
        return response.data;
    }

    async getSong(songId: number): Promise<any> {
        const response: AxiosResponse<any> = await axios.get(this.API_URL + SONG_PATH + '/' + songId);
        return response.data;
    }

    async getArtist(artistId: number): Promise<any> {
        const response: AxiosResponse<any> = await axios.get(this.API_URL + ARTIST_PATH + '/' + artistId);
        return response.data;
    }

    async getArtists(): Promise<any[]> {
        const response: AxiosResponse<any[]> = await axios.get(this.API_URL + ARTIST_PATH);
        return response.data;
    }
}
