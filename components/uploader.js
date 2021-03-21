import Uppy from "@uppy/core"
import React, {useState, useEffect} from 'react'
import { DragDrop } from "@uppy/react"
import ThumbnailGenerator from "@uppy/thumbnail-generator"
import XHRUpload from "@uppy/xhr-upload"
import { StatusBar } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/status-bar/dist/style.css'

export default function Uploader({onComplete}) {
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
		onComplete(result.successful)

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

	return (
		<div>
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
			<StatusBar
			uppy={uppy}
			hideUploadButton
			hideAfterFinish={false}
			showProgressDetails
			/>
		</div>
	)
}
