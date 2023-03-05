import { memo } from "react";
import {
  Handle,
  Position,
} from "reactflow";

function LinkNode({ data, isConnectable }) {
    return (
        <a href={data.value}>
            <div className="link-node"></div>
            <h2>{data.text}</h2>
            <Handle
                id="top"
                type="source"
                position={Position.Top}
                style={{ background: "#555" }}
                isConnectable={isConnectable}
            />
            <Handle
                id="bottom"
                type="target"
                position={Position.Bottom}
                style={{ background: "#555" }}
                isConnectable={isConnectable}
            />
        </a>
    );
}

export default memo(LinkNode);
