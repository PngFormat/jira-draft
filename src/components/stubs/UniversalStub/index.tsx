import styles from './UniversalStub.module.css';

interface IProps {
  text: string;
}

const UniversalStub = ({ text }: IProps) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
      />
      <span className={styles.title}>{text}</span>
    </div>
  );
};

export default UniversalStub;