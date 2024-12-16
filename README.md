# Expo Camera Silent Failure on Unsupported Resolutions

This repository demonstrates a bug in the Expo Camera API where attempting to use unsupported camera resolutions results in silent failure. The camera preview either shows a black screen or a distorted image, without any error messages or warnings being thrown. This makes debugging the issue very difficult.

## Bug Description

When setting a custom resolution for the Expo Camera that is not supported by the device's camera hardware, the `Camera` component doesn't throw any errors. Instead, the preview either displays a black screen or shows a severely distorted image. There's no way to programmatically detect this unsupported resolution condition, leading to unexpected behavior.

## Reproduction

The `bug.js` file provides a minimal reproducible example of this issue.  Try running the app on a device or simulator; setting the `resolution` prop to a resolution which is not supported by your device leads to a black screen or distorted camera preview.  Note that unsupported resolutions will vary between devices.

## Solution

The `bugSolution.js` file offers a potential workaround.  We attempt to get supported camera resolutions and use that to handle the resolution setting. This provides a fallback mechanism to prevent the silent failure.  It's not a perfect solution as it requires extra logic and may not account for all scenarios, but it significantly improves the robustness of the app.

## Note

This is a workaround, not a complete solution.  A more ideal approach would be for the Expo Camera API to provide a clear error or warning when an unsupported resolution is requested.