import { CardListSlider } from "./CardListSlider";
import { CardsList } from "./CardsList";
import Styles from "./CardsList.module.css";

export const CardListSection = (props) => {
  return (
    <section className={Styles["list-section"]}>
      <h2 className={Styles["list-section_title"]} id={props.id}>
        {props.title}
      </h2>
      {props.isSlider ? (
        <CardListSlider {...props} />
      ) : (
        <CardsList {...props} />
      )}
    </section>
  );
};
