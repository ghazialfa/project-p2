"use strict";
const tmdbAPI = require("../helpers/axios");
// const { default: OpenAI } = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// const openai = new OpenAI({
//   api_Key: process.env.OPENAI_API_KEY,
//   // base_url: "https://api.aimlapi.com/",
// });

class Movies_ctrl {
  //* ─── Get All ─────────────────────────────────────────────────────────
  static async getAll(req, res, next) {
    try {
      const { search } = req.query;

      let movies;
      if (search) {
        movies = await tmdbAPI.get("/search/movie", {
          params: {
            query: search,
          },
        });
      } else {
        movies = await tmdbAPI.get("/discover/movie");
      }

      // console.log("🚀 ~ Movies_ctrl ~ getAll ~ movies:", movies);
      res.status(200).json(movies.data);
    } catch (error) {
      console.log("🚀 ~ Movies_ctrl ~ getAll ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Popular ───────────────────────────────────────────────────────────
  static async getPopular(req, res, next) {
    try {
      const { data } = await tmdbAPI.get("/movie/popular");
      // console.log("🚀 ~ Movies_ctrl ~ getAll ~ data:", data);
      res.status(200).json(data);
    } catch (error) {
      console.log("🚀 ~ Movies_ctrl ~ getAll ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Detail ──────────────────────────────────────────────────────
  static async getDetail(req, res, next) {
    try {
      const { tmdbId } = req.params;

      const { data } = await tmdbAPI.get(`/movie/${tmdbId}`);
      res.status(200).json({
        id: data.id,
        title: data.title,
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        original_language: data.original_language,
        overview: data.overview,
        vote_count: data.vote_count,
        vote_average: data.vote_average,
        poster_path: data.poster_path,
        release_date: data.release_date,
        adult: data.adult,
      });
    } catch (error) {
      console.log(
        "🚀 ~ Movies_ctrl ~ getDetail ~ error:",
        error.response.data.status_message
      );
      next(error);
    }
  }

  //* ─── Ai Recommendation ───────────────────────────────────────────────
  static async getAi(req, res, next) {
    //! ─── Openai ──────────────────────────────────────────────────
    // try {
    //   const { request } = req.body;

    //   if (!openai.apiKey) {
    //     throw new Error("OpenAI API key is not configured.");
    //   }

    //   const completion = await openai.chat.completions.create({
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "kamu adalah seorang yang ahli dalam film, dan setiap ditanya kamu menjawab tanpa respon yang lain dan hanya memberikan array judul movie yang sesuai merujuk kepada tmdb",
    //       },
    //       { role: "user", content: request },
    //       // {
    //       //   role: "assistant",
    //       //   content: "The Los Angeles Dodgers won the World Series in 2020.",
    //       // },
    //       // { role: "user", content: "Where was it played?" },
    //     ],
    //     model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    //   });
    //   console.log("🚀 ~ Movies_ctrl ~ getAi ~ completion:", completion);

    //   console.log(completion.choices[0]);

    //   res.status(200).json(completion.choices[0].message.content);
    // } catch (error) {
    //   console.log("🚀 ~ MoviesController ~ getAi ~ error:", error);
    //   next(error);
    // }

    //? ─── Google ──────────────────────────────────────────────────
    try {
      const { userRequest } = req.body;
      console.log("🚀 ~ Movies_ctrl ~ getAi ~ userRequest:", userRequest);

      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_STUDIO_API_KEY);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "kamu adalah seorang yang ahli dalam film, dan setiap ditanya kamu menjawab tanpa respon yang lain dan hanya memberikan array judul movie yang sesuai merujuk kepada tmdb",
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "Oke, mengerti. Beri aku pertanyaanmu." }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const msg = userRequest;
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text = await response.text();
      // console.log("🚀 ~ Movies_ctrl ~ getAi ~ text:", text);

      const movies = [];

      for (const movie of JSON.parse(text)) {
        const { data } = await tmdbAPI.get("/search/movie", {
          params: {
            query: movie.trim(),
          },
        });
        if (data.results.length > 0) {
          movies.push(data.results[0]);
        }
      }

      const output = movies.map((el) => ({
        id: el.id,
        title: el.title,
        backdrop_path: el.backdrop_path,
        genres: el.genres,
        original_language: el.original_language,
        overview: el.overview,
        vote_count: el.vote_count,
        vote_average: el.vote_average,
        poster_path: el.poster_path,
        release_date: el.release_date,
        adult: el.adult,
      }));

      res.status(200).json({ response: output });
    } catch (error) {
      console.log("🚀 ~ Movies_ctrl ~ getAi ~ error:", error.message);
      next(error);
    }
  }
}

module.exports = Movies_ctrl;
