interface WritePageTitleProps {
  title: string;
  explanation?: string;
} 

const WritePageTitle = ({ title, explanation }: WritePageTitleProps) => {
  return (
    <div>
      <label className="flex items-baseline gap-1.5 pb-5">
        <span className="text-title3 text-gray-800 font-semibold">{title}</span>
        {explanation && (
          <span className="relative text-body1 font-light text-gray-200">
            {explanation}
            <span className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
          </span>
        )}
      </label>
    </div>
  )
}

export default WritePageTitle
