// RUN: json_to_flatbuffer %p/test_schema.fbs %s | flatbuffer_translate --tflite-flatbuffer-to-mlir -o - | FileCheck %s

// CHECK: %[[CST:.*]] = "tfl.no_value"() <{value}> : () -> none
// CHECK: %[[RES0:.*]] = "tfl.conv_2d"(%arg0, %arg1, %[[CST]]) <{dilation_h_factor = 1 : i32, dilation_w_factor = 1 : i32, fused_activation_function = "NONE", padding = "SAME", stride_h = 1 : i32, stride_w = 1 : i32}> : (tensor<256x32x32x3xf32>, tensor<16x3x3x3xf32>, none) -> tensor<256x32x32x16xf32>
// CHECK: return %[[RES0]] : tensor<256x32x32x16xf32>

{
  "version": 3,
  "operator_codes": [
    {
      "builtin_code": "CONV_2D"
    }
  ],
  "subgraphs": [
    {
      "tensors": [
        {
          "shape": [
            256,
            32,
            32,
            3
          ],
          "name": "arg0",
          "quantization": {
          }
        },
        {
          "shape": [
            16,
            3,
            3,
            3
          ],
          "name": "arg1",
          "quantization": {
          }
        },
        {
          "shape": [
            0
          ],
          "name": "cst"
        },
        {
          "shape": [
            256,
            32,
            32,
            16
          ],
          "name": "output",
          "quantization": {
          }
        }
      ],
      "inputs": [
        0,
        1
      ],
      "outputs": [
        3
      ],
      "operators": [
        {
          "inputs": [
            0,
            1,
            -1
          ],
          "outputs": [
            3
          ],
          "builtin_options_type": "Conv2DOptions",
          "builtin_options": {
            "stride_w": 1,
            "stride_h": 1
          }
        }
      ],
      "name": "main"
    }
  ],
  "description": "MLIR Converted."
}
