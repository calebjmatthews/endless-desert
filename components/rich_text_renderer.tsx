import React from 'react';
import { Text } from 'react-native';

import RichText from '../models/rich_text';

const RichTextRenderer = (props: { richText: RichText }) => {
  const { richText } = props;

  switch(richText.type) {
    case 'Text':
    return <Text {...richText.props}><RichTextContents contents={richText.contents}/></Text>;

    default:
    return null;
  }
}

const RichTextContents = (props: { contents?: (RichText|string)[] }) => {
  const { contents } = props;
  if (!contents) { return null; }

  return (
    <>
      {contents.map((content) => {
        if (typeof content === 'object') {
          return <RichTextRenderer key={JSON.stringify(content)} richText={content} />
        }
        return <Text key={JSON.stringify(content)}>{content}</Text>;
      })}
    </>
  );
}

export default RichTextRenderer;