import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';
import Link from 'next/link'
import Uppy from "@uppy/core"
import { DragDrop } from "@uppy/react"
import ThumbnailGenerator from "@uppy/thumbnail-generator"
import XHRUpload from "@uppy/xhr-upload"
import { StatusBar } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/status-bar/dist/style.css'

const uppy = new Uppy({
  meta: { type: "music-upload" },
  restrictions: {
    maxNumberOfFiles: 3,
    maxFileSize: 1048576 * 16,
    allowedFileTypes: [".mp3", ".mp4"],
  },
  autoProceed: true,
})

uppy.use(XHRUpload, {
  endpoint: "/api/upload",
  fieldName: "music-upload",
  formData: true,
})

uppy.use(ThumbnailGenerator, {
  thumbnailWidth: 200,
  waitForThumbnailsBeforeUpload: false,
})

uppy.on("thumbnail:generated", (file, preview) => {
  console.log(file.name, preview)
})

uppy.on("complete", result => {
  const url = result.successful[0].uploadURL
  console.log("successful upload", result)
})

uppy.on("error", error => {
  console.error(error.stack)
})

uppy.on("restriction-failed", (file, error) => {
  const err = error.stack.includes("exceeds maximum allowed size of 16 MB")
    ? "A fájl mérete nagyobb mint 4MB"
    : error

  alert(
    "Feltöltési hiba: " +
      err +
      "\n" +
      file.name +
      " Mérete : " +
      Math.round(file.size / 1024 / 1024) +
      "MB"
  )
})

export default function Upload() {
	const [state, setState] = useState('new');


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

							<div className="">
								<h3 className="text-3xl font-bold mt-12">
									Step 2: Upload Your Local Music
								</h3>
							</div>
							<div className="my-6 max-w-screen-md mx-auto">
								<p>
									Upload your music below. Click and drag or click the button to upload.
								</p>
							</div>

							<div className="my-8 mx-auto">
								<div className="btn btn-orange">
									<DragDrop
										uppy={uppy}
										locale={{
											strings: {
												// Text to show on the droppable area.
												// `%{browse}` is replaced with a link that opens the system file selection dialog.
												dropHereOr: "Upload Music",
												// Used as the label for the link that opens the system file selection dialog.
												browse: "Browse for Local Music",
											},
										}}
									/>
								</div>
								<StatusBar
									uppy={uppy}
									hideUploadButton
									hideAfterFinish={false}
									showProgressDetails
								/>


							</div>
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
