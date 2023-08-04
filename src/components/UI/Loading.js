import classes from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div className={classes.loading}>
      <p>{props.content}</p>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
