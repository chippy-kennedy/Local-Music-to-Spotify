import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Uploader from '../components/uploader'
import { isEmpty } from '../utils'
import axios from 'axios'

export default function Upload() {
	const router = useRouter()
	const [isLoading, setLoading] = useState(false)
	const [uploadStatus, setUploadStatus] = useState('not-started')
	const [unmatchedSongs, setUnmatchedSongs] = useState([])
	const [matchedSongs, setMatchedSongs] = useState([])

	useEffect(() => {
    if (uploadStatus == 'complete' && !isEmpty(unmatchedSongs)) {
			matchSongs(unmatchedSongs)
    }
  }, [uploadStatus, unmatchedSongs]);

	const matchSongs = async (unmatchedSongs) => {
		const { code } = router.query

		unmatchedSongs.forEach(async (song) => {
			console.log("\n---------")
			console.log(song)
			await axios.post('/api/find-song', {
				song: song,
				accessToken: code
			}).then(function (response) {
				//add id to song
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

			await axios.post('/api/add-to-library', {
				songId: song.id,
				accessToken: code
			}).then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		})
	}

  return (
		<div className="flex flex-col items-center justify-center min-h-screen pt-2 bg-green">
      <Head>
        <title>Save Local Music to Spotify</title>
				<meta name="description" content="Save your local music library to Spotify without needing to download your library on every device"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-0 text-center space-y-5 w-full">
				<div className="section w-full mx-0 mt-24 pb-6 bg-green">
						<div className="container mx-auto mt-12 w-full">
							<Image
								src="/laptop-upload.svg"
								alt="Laptop with upload icon"
								width="175"
								height="175"
							/>
							<h1 className="text-5xl font-bold mt-6">
								Save Local Music to Spotify
							</h1>
							<div className="my-6 max-w-screen-md mx-auto">
								<p>Save your local music library to Spotify without needing to download your library to every device</p>
							</div>

							{uploadStatus == 'not-started' &&
							<div>
								<div className="">
									<h3 className="text-3xl font-bold mt-12">
										Step 2: Upload Your Local Music
									</h3>
								</div>
								<div className="my-6 max-w-screen-sm mx-auto">
									<p>
										Upload your music below. Click and drag or click the button to upload. You can start with one song or many, just note that larger batches will take more time.
									</p>
								</div>

								<div className="my-8 mx-auto">
									<Uploader onComplete={(uploadedSongs) => {
										setUnmatchedSongs(uploadedSongs)
										setUploadStatus('complete')
									}}/>
								</div>
							</div>
							}
							{uploadStatus == 'complete' &&
							<div>
								<div className="">
									<h3 className="text-3xl font-bold mt-12">
										Step 3: Adding Music to Your Spotify Library
									</h3>
								</div>
								<div className="my-6 max-w-screen-sm mx-auto">
									<p>
										We got this part. We're checking each song you uploaded and adding it to your Spotify library. You can just hang out for this part.
									</p>
								</div>

								<div className="my-8 mx-auto">
									Progess Bar
								</div>
							</div>
							}
					</div>
				</div>

				<div className="section w-full py-10 my-12 bg-white">
					<div className="container mx-auto my-16 w-full">
						<h3 className="text-3xl font-bold mt-12">
							Listen to your local music library, without local files.
						</h3>
						<div className="my-6 max-w-screen-md mx-auto">
							<p>
								Spotify supports your local music, sortof. You can load your local music into Spotify, but at best it's excluded from the rest of your library. More than that, it can only be played on a device that has the actual music files.
							</p>
						</div>
					</div>
					<div className="container mx-auto mt-16 w-full flex justify-evenly">
						<div className="flex-col max-w-xs">
							<div>
								<Image
									src="/code.svg"
									alt="code icon"
									width="75"
									height="75"
								/>
							</div>
							<div>
								<h4 className="text-xl font-semibold uppercase tracking-widest py-4">
									Open Source
								</h4>
							</div>
							<div>
								<p>
									If you're interested, check out the post. If you're a developer, you can see how I built it. And if you want to pitch in, you can see the code.
								</p>
							</div>
						</div>

						<div className="flex-col max-w-xs">
							<div>
								<Image
									src="/present.svg"
									alt="present icon"
									width="75"
									height="75"
								/>
							</div>
							<div>
								<h4 className="text-xl font-semibold uppercase tracking-widest py-4">
									Free to Use
								</h4>
							</div>
							<div>
								<p>
									I built this for myself, but figured other folks might want it too. If you like it, feel free to buy me a coffee
								</p>
							</div>
						</div>

						<div className="flex-col max-w-xs">
							<div>
								<Image
									src="/lock.svg"
									alt="lock icon"
									width="75"
									height="75"
								/>
							</div>
							<div>
								<h4 className="text-xl font-semibold uppercase tracking-widest py-4">
									Private
								</h4>
							</div>
							<div>
								<p>
									The service doesn't save any information about you or your music. We'll authenticate you through Spotify while you use the service, but won't save any information after.
								</p>
							</div>
						</div>

					</div>
				</div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-black">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
