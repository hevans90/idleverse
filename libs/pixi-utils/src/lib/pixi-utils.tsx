import styles from './pixi-utils.module.css';

/* eslint-disable-next-line */
export interface PixiUtilsProps {}

export function PixiUtils(props: PixiUtilsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PixiUtils!</h1>
    </div>
  );
}

export default PixiUtils;
