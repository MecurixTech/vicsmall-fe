interface OverviewProps {
  description: string
  tags?: string[]
  category?: string
  createdAt?: string
  updatedAt?: string
}

const Overview = ({ description, tags, category, createdAt, updatedAt }: OverviewProps) => {
  return (
    <div>
      {category && (
        <div className="mb-4">
          <span className="font-medium">Category: </span>
          <span className="rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-800">{category}</span>
        </div>
      )}

      <p className="mb-4 whitespace-pre-wrap">{description || "No description available for this product."}</p>

      {tags && tags.length > 0 && (
        <div className="mt-4">
          <span className="font-medium">Tags: </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {(createdAt || updatedAt) && (
        <div className="mt-4 text-sm text-gray-500">
          {createdAt && <div>Created: {new Date(createdAt).toLocaleString()}</div>}
          {updatedAt && <div>Last updated: {new Date(updatedAt).toLocaleString()}</div>}
        </div>
      )}

      {!description && (
        <>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum beatae corporis nihil distinctio esse sunt
            eligendi architecto quod vel consectetur.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt doloremque sed labore nemo voluptatem
            sequi optio inventore voluptate. Quia dolorem ducimus necessitatibus nemo? Iste dolorem, eos porro quaerat
            dolores et.
          </p>
        </>
      )}
    </div>
  )
}

export default Overview

