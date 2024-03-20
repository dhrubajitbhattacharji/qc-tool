"use client"
import * as React from "react"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

type formFields = {
  videoId: string
  videoUrl: string
}

export function FetchVideoForm() {
  const [showLoad, setShowLoad] = React.useState(false)
  const [isTypingId, setIsTypingId] = React.useState(false)
  const [isTypingUrl, setIsTypingUrl] = React.useState(false)
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<formFields>();

  const handleFetchAudio = () => {
    // axios.get()
  }
  const onSubmit: SubmitHandler<formFields> = async (data) => {
    if (data.videoUrl) {
      const vidId = data.videoUrl.split("/").pop()
      await axios.post(`/api/fetch`, {
        videoId: vidId
      }
      ).then((res) => {
        console.log(res)
        if (res.data === 'Video File already exists in the server')
        {
          toast("File already exists",{
          classNames: {
            title: 'text-xl',
          }
      })
    }
    })
      // setShowLoad(false)
    }

    console.log(data)
  }

  return (
    <>
      {!showLoad &&
        <Card className="w-[850px]">
          <CardHeader>
            <CardTitle>Kriyam Audio Labelling Tool</CardTitle>
            <CardDescription>Get Video/Audio by ID or URL</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Video ID</Label>
                  <Input {...register("videoId", {
                    // required: "Id is required",
                  })} id="name" placeholder="ex: abc123"
                  // onChange={() => setIsTypingId(true)} 
                  // disabled={isTypingUrl}
                  />
                </div>
                {errors.videoId && <span className="text-red-500 text-sm">{errors.videoId.message}</span>}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Video URL</Label>
                  <Input {...register("videoUrl", {
                    // required: "Link is required",
                    validate: (value) => {
                      if (!value.includes("https://meeting.foxivision.net/")) {
                        return "the link must be a valid foxivision link"
                      }
                      else return true
                    }
                  })} id="name" placeholder="ex: https://meeting.foxivision.net/"
                  // onChange={() => setIsTypingUrl(true)} 
                  // disabled={isTypingId}
                  />
                </div>
                {errors.videoUrl && <span className="text-red-500 text-sm">{errors.videoUrl.message}</span>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => reset()}>Cancel</Button>
              <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Fetching..." : "Fetch Audio"}</Button>
            </CardFooter>
          </form>
        </Card>
      }
    </>

  )
}
