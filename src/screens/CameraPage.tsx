import * as React from 'react';
import {useRef, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import Reanimated, {runOnJS} from 'react-native-reanimated';
import {useIsForeground} from '@app/hooks/useIsForeground';
import {StatusBarBlurBackground} from '@app/views/StatusBarBlurBackground';
import type {BottomTabParamList, Routes} from '@app/routes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/core';
import {scanBarcodes, BarcodeFormat, Barcode} from 'vision-camera-code-scanner';
import {SAFE_AREA_PADDING} from '@app/constants';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import {addWithBarcode} from '@app/constants/cartReducers';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

type CameraPageNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Camera'>,
  NativeStackScreenProps<Routes>
>;
export function CameraPage({}: CameraPageNavigationProp): React.ReactElement {
  const camera = useRef<Camera>(null);

  const dispatch = useDispatch();
  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  // camera settings
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const [barcodes, setBarcodes] = React.useState<Barcode[]>([]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    if (detectedBarcodes.length > 0) {
      console.log('scanned barcodes 2', detectedBarcodes);
      runOnJS(setBarcodes)(detectedBarcodes);
      dispatch(addWithBarcode(detectedBarcodes[0].displayValue));
    }
  }, []);

  React.useEffect(() => {
    console.log('scanned barcodes', barcodes);
  }, [barcodes]);

  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  if (device != null) {
    console.log(
      `Re-rendering camera page with ${
        isActive ? 'active' : 'inactive'
      } camera. ` +
        `Device: "${device.name}"` +
        `SupportsParallelVideoProcessing: "${device.supportsParallelVideoProcessing}"`,
    );
  } else {
    console.log('re-rendering camera page without active camera');
  }

  const onFrameProcessorSuggestionAvailable = useCallback(
    (suggestion: FrameProcessorPerformanceSuggestion) => {
      console.log(
        `Suggestion available! ${suggestion.type}: Can do ${suggestion.suggestedFrameProcessorFps} FPS`,
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      {device != null && (
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            onError={onError}
            enableZoomGesture={false}
            frameProcessor={frameProcessor}
            orientation="portrait"
            frameProcessorFps={1}
            onFrameProcessorPerformanceSuggestionAvailable={
              onFrameProcessorSuggestionAvailable
            }
          />
        </Reanimated.View>
      )}

      <StatusBarBlurBackground style={undefined} />

      <View style={styles.rightButtonRow}>
        {barcodes.map((barcode, idx) => (
          <Text style={styles.text} key={idx}>
            {barcode.displayValue}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
