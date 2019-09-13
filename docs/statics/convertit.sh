FULLFILE=$1
FILENAME=${FULLFILE%%.*}

ffmpeg -i $FULLFILE -vcodec libvpx-vp9 -b:v 1M -acodec libvorbis $FILENAME.webm
ffmpeg -an -i $FULLFILE -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3 $FILENAME.mp4
