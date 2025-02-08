"use client"

import FileUploader from "@/components/FileUploader"
import { useState } from "react"
import ResultTable from "@/components/ResultTable"
import { Button } from "@/components/ui/button"
import TutorialDialog from "@/components/TutorialDialog"

interface User {
    href: string
    value: string
}

export default function Home() {
    const [following, setFollowing] = useState<User[] | null>(null)
    const [followers, setFollowers] = useState<User[] | null>(null)
    const [result, setResult] = useState<User[]>([])

    const handleCompare = () => {
        if (following && followers) {
            const followerMap = new Map(followers.map((user) => [user.href, user.value]))

            const notFollowingBack = following.filter(
                (user) => !followerMap.has(user.href) || followerMap.get(user.href) !== user.value,
            )

            setResult(notFollowingBack)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 mt-10">Instagram Follower Checker</h1>
            <FileUploader
                label="Upload File JSON Follower"
                fileType="followers"
                onFileUploaded={(data) => setFollowers(data)}
            />
            <FileUploader
                label="Upload File JSON Following"
                fileType="following"
                onFileUploaded={(data) => setFollowing(data)}
            />
            <TutorialDialog />
            <Button
                onClick={handleCompare}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!following || !followers}
            >
                Bandingkan
            </Button>
            {result.length > 0 && <ResultTable result={result} />}
        </div>
    )
}

