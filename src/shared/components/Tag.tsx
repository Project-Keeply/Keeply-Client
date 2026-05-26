interface TagProps {
  variant: 'primary' | 'secondary';
  label : string;
}

const variantStyles = {
  primary: 'bg-primary-100 text-primary-500',
  secondary: 'bg-orange-100 text-orange-500',
}

const Tag = ({ variant, label }: TagProps) => {
  return (
    <span className={`inline-flex items-center rounded-[5px] px-[9px] py-[6px] ${variantStyles[variant]} text-label2 font-semibold`}>
      {label}
    </span>
  )
};

export default Tag
