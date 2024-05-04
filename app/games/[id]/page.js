"use client";
import { useEffect, useState } from "react";
import { getGameById } from "../../data/data-utils";
import Styles from "./game.module.css";
import {
  checkIfUserVoted,
  getJWT,
  getMe,
  getNormalizedGameDataById,
  isResponseOk,
  removeJWT,
  setVoteToGame,
  vote,
} from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { handleVote } from "@/components/Header/project4/app/api/api-utils";
import { data } from "@/app/data/data";
import { useStore } from "../../store/app-store";

export default function GamePage(props) {
  const store = useStore();
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const game = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const jwt = getJWT();
    if (jwt) {
      getMe(endpoints.me, jwt).then((userData) => {
        if (isResponseOk(userData)) {
          setIsAuthorized(true);
          setCurrentUser(userData);
        } else {
          setIsAuthorized(false);
          removeJWT();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (game && store.user) {
      setIsVoted(checkIfUserVoted(game.users, store.user.id));
      setIsVoted(!!isVoted);
    } else {
      setIsVoted(false);
    }
  }, [store.user]);
  const handleVote = async () => {
    const jwt = store.token;
    const data = await setVoteToGame(
      `${endpoints.games}/${props.params.id}`,
      jwt
    );
    if (jwt) {
      let usersArray = game.users.length
        ? game.users.map((user) => user.id)
        : [];
      usersArray.push(store.user.id);
      const response = await vote(
        `${endpoints.games}/${game.id}`,
        jwt,
        usersArray
      );
      console.log(response);
      if (isResponseOk(response)) {
        setIsVoted(true);
        setGame({
          ...game,
          users: response.users_permissions_users,
          users_permissions_users: response.users_permissions_users,
        });
      }
    }
  };

  return game ? (
    <>
      <section className={Styles["game"]}>
        <iframe className={Styles["game__iframe"]} src={game.link}></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>{game.title}</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>{game.description}</p>
          <div className={Styles["about__author"]}>
            <p className={Styles["about__vote-amount"]}>
              За игру уже проголосовали:{" "}
              <span className={Styles["about__accent"]}>
                {game.users.length}
              </span>
            </p>
            <span className={Styles["about__accent"]}>{game.users.length}</span>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          {isVoted ? (
            <button
              className={`button ${Styles["about_vote-button"]}`}
              onClick={handleVote}
              disabled={true}
            >
              Голос учтён
            </button>
          ) : (
            <button
              className={`button ${Styles["about_vote-button"]} `}
              onClick={handleVote}
            >
              Голосовать
            </button>
          )}
        </div>
      </section>
    </>
  ) : (
    <section className={Styles["game"]}>
      <p>Такой игры не существует 😢</p>
    </section>
  );
}
