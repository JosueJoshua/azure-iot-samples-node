// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var iothub = require('azure-iothub');

var connectionString = process.env.IOTHUB_CONNECTION_STRING;
if (!connectionString) {
  console.log('Please set the IOTHUB_CONNECTION_STRING environment variable.');
  process.exit(-1);
}

var registry = iothub.Registry.fromConnectionString(connectionString);
var device = {
  deviceId: '<DEVICE ID>',
  status: 'enabled',
  authentication: {
    x509Thumbprint: {
      primaryThumbprint: "<PRIMARY THUMBPRINT>",
      secondaryThumbprint: "<SECONDARY THUMBPRINT>"
    }
  }
};

registry.create(device, function (err) {
  if(err) {
    console.error('Could not create device: ' + err.message);
    process.exit(-1);
  } else {
    registry.get(device.deviceId, function(err, deviceInfo) {
      if(err) {
        console.error('Could not get device: ' + err.message);
        process.exit(-1);
      } else {
        console.log(JSON.stringify(deviceInfo));
        process.exit(0);
      }
    });
  }
});
