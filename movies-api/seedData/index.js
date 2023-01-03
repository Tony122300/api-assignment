import userModel from '../api/users/userModel';
import genreModel from '../api/genres/genreModel';
import movieModel from '../api/movies/movieModel';
import users from './users';
import dotenv from 'dotenv';
import genres from './genres';
import movies from './movies.js';
import subModel from '../api/subs/subModel';
import subs from './subs';
dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
    console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

async function loadGenres() {
    console.log('load genre Data');
    try {
      await genreModel.deleteMany();
      await genreModel.collection.insertMany(genres);
      console.info(`${genres.length} genres were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load genres Data: ${err}`);
    }
  }

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
    console.log('load seed data');
    console.log(movies.length);
    try {
      await movieModel.deleteMany();
      await movieModel.collection.insertMany(movies);
      console.info(`${movies.length} Movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load movie Data: ${err}`);
    }
  }

  async function loadSubs() {
    console.log('load subs Data');
    try {
      await subModel.deleteMany();
      await subs.forEach(sub => subModel.create(sub));
      console.info(`${subs.length} subs were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load sub Data: ${err}`);
    }
  }
  

if (process.env.SEED_DB) {
  loadUsers();
  loadGenres();
  loadMovies();
  loadSubs();
}