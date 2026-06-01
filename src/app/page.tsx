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
    const [hasCompared, setHasCompared] = useState(false)
    const [allSeenUsers, setAllSeenUsers] = useState<Map<string, string>>(new Map())

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
            // Create a set of follower usernames for O(1) lookup
            const followerUsernames = new Set(
                followers.map((user) => user.value.toLowerCase())
            )

            // Filter out following users who are not in the follower set
            const notFollowingBack = following.filter(
                (user) => !followerUsernames.has(user.value.toLowerCase())
            )

            setResult(notFollowingBack)
            setHasCompared(true)
        }
    }

    const filteredResult = result.filter((user) => {
        const isWhitelisted = whitelist.includes(user.href)
        const username = user.value || ""
        const matchesSearch = username.toLowerCase().includes(searchQuery.toLowerCase())
        return !isWhitelisted && matchesSearch
    })

    useEffect(() => {
        if (result.length > 0) {
            setAllSeenUsers(prev => {
                const next = new Map(prev)
                result.forEach(u => next.set(u.href, u.value))
                return next
            })
        }
    }, [result])

    const whitelistedData = whitelist.map(href => ({
        href,
        value: allSeenUsers.get(href) || href.split('/').filter(Boolean).pop() || href
    }))

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-5xl font-black mb-8 mt-10 uppercase tracking-tighter text-center">
                Instagram Follower Checker
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <FileUploader
                    label="Upload File JSON Follower"
                    fileType="followers"
                    onFileUploaded={(data) => {
                        setFollowers(data)
                        setHasCompared(false)
                    }}
                />
                <FileUploader
                    label="Upload File JSON Following"
                    fileType="following"
                    onFileUploaded={(data) => {
                        setFollowing(data)
                        setHasCompared(false)
                    }}
                />
            </div>
            <div className="flex flex-col items-center gap-4 mt-4">
                <TutorialDialog />
                <Button
                    onClick={handleCompare}
                    className="px-10 py-6 bg-blue-500 text-white border-2 border-black shadow-neo hover:bg-blue-400 font-black uppercase text-xl"
                    disabled={!following || !followers}
                >
                    Bandingkan Sekarang
                </Button>
            </div>

            {hasCompared && result.length === 0 && (
                <div className="mt-10 p-8 border-4 border-black bg-green-400 shadow-neo max-w-2xl text-center">
                    <h2 className="text-2xl font-black uppercase">Hebat! Semua orang mem-follow balik akun Anda.</h2>
                </div>
            )}

            {hasCompared && result.length > 0 && (
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

