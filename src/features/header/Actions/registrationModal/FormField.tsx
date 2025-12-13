import styles from './AuthModal.module.scss';
type FormFieldProps = {
    className?: string;
    label: string;
    children: React.ReactNode;
    error?: string
}

function FormField({label,className, error, children }: FormFieldProps) {
  return (
    <div className={className}>
        <label className={styles.modal__label}>{label}</label>
        {children}
      <div className={styles.modal__error}>{error}</div>
    </div>
  )
}

export default FormField
