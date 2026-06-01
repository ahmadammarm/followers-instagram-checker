"use client"

import FileUploader from "@/components/FileUploader"
import { useState, useEffect } from "react"
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
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [whitelist, setWhitelist] = useState<string[]>([])

    // Load whitelist from localStorage on mount
    useEffect(() => {
        const savedWhitelist = localStorage.getItem("ig_checker_whitelist")
        if (savedWhitelist) {
            try {
                setWhitelist(JSON.parse(savedWhitelist))
            } catch (e) {
                console.error("Failed to parse whitelist from localStorage", e)
            }
        }
    }, [])

    // Save whitelist to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("ig_checker_whitelist", JSON.stringify(whitelist))
    }, [whitelist])

    const handleAddToWhitelist = (href: string) => {
        setWhitelist((prev) => [...prev, href])
    }

    const handleRemoveFromWhitelist = (href: string) => {
        setWhitelist((prev) => prev.filter((item) => item !== href))
    }

    const handleCompare = () => {
        if (following && followers) {
            const followerMap = new Map(followers.map((user) => [user.href, user.value]))

            const notFollowingBack = following.filter(
                (user) => !followerMap.has(user.href) || followerMap.get(user.href) !== user.value,
            )

            setResult(notFollowingBack)
        }
    }

    const filteredResult = result.filter((user) => {
        const isWhitelisted = whitelist.includes(user.href)
        const matchesSearch = user.value.toLowerCase().includes(searchQuery.toLowerCase())
        return !isWhitelisted && matchesSearch
    })

    const whitelistedData = result.filter((user) => whitelist.includes(user.href))

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-5xl font-black mb-8 mt-10 uppercase tracking-tighter text-center">
                Instagram Follower Checker
            </h1>
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
            {result.length > 0 && (
                <ResultTable
                    result={filteredResult}
                    onWhitelist={handleAddToWhitelist}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    whitelistData={whitelistedData}
                    onRemoveFromWhitelist={handleRemoveFromWhitelist}
                />
            )}
        </div>
    )
}

