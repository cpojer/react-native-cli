/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import findPodspec from '../findPodspec';
import * as projects from '../__fixtures__/projects';

jest.mock('path');
jest.mock('fs');

const fs = require('fs');

describe('ios::findPodspec', () => {
  it('returns null if there is not podspec file', () => {
    // $FlowFixMe
    fs.__setMockFilesystem(projects.flat);
    expect(findPodspec('')).toBeNull();
  });

  it('returns podspec name if only one exists', () => {
    // $FlowFixMe
    fs.__setMockFilesystem(projects.withPods.ios);
    expect(findPodspec('/')).toBe('/TestPod.podspec');
  });

  it('returns podspec name that match packet directory', () => {
    // $FlowFixMe
    fs.__setMockFilesystem({
      user: {
        PacketName: {
          'Another.podspec': 'empty',
          'PacketName.podspec': 'empty',
        },
      },
    });
    expect(findPodspec('/user/PacketName')).toBe(
      '/user/PacketName/PacketName.podspec',
    );
  });

  it('returns first podspec name if not match in directory', () => {
    // $FlowFixMe
    fs.__setMockFilesystem({
      user: {
        packet: {
          'Another.podspec': 'empty',
          'PacketName.podspec': 'empty',
        },
      },
    });
    expect(findPodspec('/user/packet')).toBe('/user/packet/Another.podspec');
  });
});
