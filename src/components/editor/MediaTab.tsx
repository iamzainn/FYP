"use client"

import { useEffect, useState } from "react"
import { MediaType } from "@prisma/client"

type MediaFile = {
  id: string
  url: string
  type: MediaType
  altText?: string
  width?: number
  height?: number
  mimeType?: string
  fileSize?: number
  storeId: string
  createdAt: Date
  updatedAt: Date
}

type Props = {
  storeId: string
}

const MediaTab = ({storeId}: Props) => {
  const [data, setData] = useState<MediaFile[] | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(storeId)
      setData(response)
    }
    
    fetchData()
  }, [storeId])
  
  return (
    <div className="h-[800px] overflow-scroll p-4">
      <MediaComponent 
        data={data} 
        storeId={storeId}

        
      />
    </div>
  )
}

// Function to fetch media data from the API
const getMedia = async (storeId: string) => {
  try {
    // This would be replaced with your actual API call
    const response = await fetch(`/api/stores/${storeId}/media`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching media:", error)
    return null
  }
}

// Component to display media items
const MediaComponent = ({ 
  data,
  
}: { 
  data: MediaFile[] | null
  storeId: string 
}) => {
  if (!data) {
    return <div>Loading media...</div>
  }
  
  if (data.length === 0) {
    return <div>No media found. Upload some images to get started.</div>
  }
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((media) => (
        <div 
          key={media.id} 
          className="border rounded-md p-2 hover:border-primary cursor-pointer"
        >
          {media.type === "IMAGE" && (
            <img 
              src={media.url} 
              alt={media.altText || "Media"} 
              className="w-full h-auto object-cover"
            />
          )}
          {media.type === "VIDEO" && (
            <video 
              src={media.url} 
              controls 
              className="w-full h-auto"
            />
          )}
          <p className="text-sm truncate mt-2">{media.altText || media.url.split('/').pop()}</p>
        </div>
      ))}
    </div>
  )
}

export default MediaTab