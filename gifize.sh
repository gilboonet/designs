	#!/bin/bash

filters="fps=15,scale=320:-1:flags=lanczos"

ffmpeg -v warning -i $1.mp4 -vf "$filters,palettegen=stats_mode=diff" -y palette.png

ffmpeg -i $1.mp4 -i palette.png -lavfi "$filters,paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -y $1.gif
