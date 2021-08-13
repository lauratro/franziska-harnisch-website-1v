import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/core/styles';
import LayImg from '../LayImg/LayImg';
import LayVideo from '../LayVideo/LayVideo';
import RelatedImgs from '../RelatedImgs/RelatedImgs';
import Content, { HTMLContent } from '../Content';

const useStyles = makeStyles((theme) => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  h1Fontsize: {
    fontSize: '60px',
    color: blueGrey[700],
  },
  descWidth: {
    width: '500px',
  },
  topPart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '300px',
    marginTop: theme.spacing(3),
  },
  hashColor: {
    color: blueGrey[600],
  },
  '@media only screen and (max-width: 800px)': {
    topPart: {
      flexDirection: 'column',
    },
    descWidth: {
      width: '300px',
    },
  },
}));

export default function Layout1({ workdetailsData, location }) {
  const classes = useStyles();
  console.log('layout1 location', location);
  const [ftImg, setFtImg] = useState({});
  const {
    title,
    subTitle,
    links,
    layoutType,
    hashtags,
    images,
    youtubeVideos,
    featuredimage,
    titleToShow,
    content,
    contentComponent,
  } = workdetailsData;
  console.log(images, featuredimage);
  const PostContent = contentComponent || Content;

  useEffect(() => {
    const ftObj = {
      imageTitle: title,
      image: featuredimage,
    };
    console.log(ftObj);
    setFtImg(ftObj);
  }, []);

  return (
    <>
      <Box className={classes.flexColumn}>
        <Box className={classes.flexColumn} mt={5}>
          <Typography className={classes.h1Fontsize} variant="h1">
            {titleToShow}
          </Typography>
          <Typography variant="h6">{subTitle}</Typography>
          {hashtags && hashtags.length > 0 && (
            <Box className={classes.hashFlex}>
              {hashtags.map((h, index) => (
                <Box key={`${h}-${index}`} ml={2}>
                  <Typography className={classes.hashColor}>
                    #{h.hashtag}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box className={classes.topPart} m={4}>
          <Box>
            <Box>
              <LayImg img={ftImg} />
            </Box>
          </Box>
          <Box className={classes.flexColumn}>
            {content && (
              <Box className={classes.descWidth} ml={8}>
                <PostContent content={content} />
              </Box>
            )}
            <Box className={classes.links}>
              {links &&
                links.length > 0 &&
                links.map((l, index) => (
                  <Box key={`${l.linkName}-${index}`} ml={2}>
                    <Link href={l.linkURL}>
                      <Typography>{l.linkName}</Typography>
                    </Link>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>

        <Box className={classes.flexWrap}>
          {youtubeVideos &&
            youtubeVideos.length > 0 &&
            youtubeVideos.map((v, index) => (
              <Box key={`video-${index}`}>
                <LayVideo video={v} />
              </Box>
            ))}
        </Box>

        <Box className={classes.flexWrap} mt={4}>
          {images && images.map((i, index) => <LayImg key={index} img={i} />)}
        </Box>

        <Box>
          <RelatedImgs location={location} />
        </Box>
      </Box>
    </>
  );
}
