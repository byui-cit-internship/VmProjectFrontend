import styles from './tooltip.module.css';

export default function Tooltip(props) {
  const { text, linkObj, label} = props;
  return (
    <div className={styles.tooltip}>
      <label class={styles.canvasToken} htmlFor='canvasToken'>
        {label}: <i className={styles.icon}>i</i>
      </label>
      <p className={styles.tooltipinfo}>
        <span className={styles.info}>
          {text ?? 'text not set'}{' '}
          {linkObj &&
          (
            <a href={linkObj.href}>
              {linkObj.text}
            </a>
          )}
        </span>
      </p>
    </div>
  );
}
