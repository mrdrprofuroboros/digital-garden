import json
import os

with open('../../Documents/obsidian/FamilyTree/🌳 Древо.canvas') as f:
    canvas = json.load(f)

nnodes = []
for node in canvas["nodes"]:
    nx = 120 * ((node['x'] + 5) // 120)
    ny = 120 * ((node['y'] + 5) // 120)
    nnodes.append({
        **node,
        'x': nx,
        'y': ny,
        'width': 240 if node['width'] > 200 else 120,
        'height': 240 if node['height'] > 200 else 120,
    })
canvas['nodes'] = nnodes

# nedges = []
# for edge in canvas['edges']:
#     nedges.append({
#         **edge,
#         'fromSide': 'bottom',
#         'toSide': 'top',
#     })
# canvas['edges'] = nedges
with open('../../Documents/obsidian/FamilyTree/🌳 Древо.canvas', 'w') as f:
    json.dump(canvas, f)
