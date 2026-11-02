import { Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, padding } from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

export type MerkzettelProps = {
  text: string;
  stand: string;
};

// Praxistest: Der Text kommt aus der App (updateSnapshot) über die App Group ins Widget.
const Merkzettel = (props: MerkzettelProps, environment: WidgetEnvironment) => {
  'widget';
  if (environment.widgetFamily === 'accessoryRectangular') {
    return (
      <VStack>
        <Text modifiers={[font({ weight: 'bold', size: 13 })]}>Merkzettel</Text>
        <Text modifiers={[font({ size: 13 })]}>{props.text}</Text>
      </VStack>
    );
  }
  return (
    <VStack modifiers={[padding({ all: 4 })]}>
      <Text modifiers={[font({ weight: 'bold', size: 15 })]}>Merkzettel</Text>
      <Text modifiers={[font({ size: 14 })]}>{props.text}</Text>
      <Text modifiers={[font({ size: 11 }), foregroundStyle('#8E8E93')]}>{props.stand}</Text>
    </VStack>
  );
};

export default createWidget('Merkzettel', Merkzettel, {
  text: 'Noch nichts gemerkt',
  stand: 'App einmal öffnen',
});
