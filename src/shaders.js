var Shaders = {
    'noise-frag':
        '#version 300 es\n'                                                   +
        'precision highp float;\n\n'                                          +

        'in vec2 vUV;\n'                                                      +
        'out vec4 FragColor;\n\n'                                             +

        'uniform float uTime;\n\n'                                            +

        'float rand(vec2 p) {\n'                                              +
        '    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);\n' +
        '}\n\n'                                                               +

        'void main() {\n'                                                     +
        '    float n = rand(vUV * 1000.0 + uTime);\n'                         +
        '    FragColor = vec4(vec3(n), 1.0);\n'                               +
        '}\n',

    'noise-vert':
        '#version 300 es\n'                             +
        'precision highp float;\n\n'                    +

        'in vec2 Position;\n'                           +
        'out vec2 vUV;\n\n'                             +

        'void main() {\n'                               +
        '    vUV = Position * 0.5 + 0.5;\n'             +
        '    gl_Position = vec4(Position, 0.0, 1.0);\n' +
        '}\n'
}