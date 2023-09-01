import React from "react";

function NotyModal() {
  return (
    <div className="absolute right-0 top-0 bg-red-200 px-1 py-2 flex rounded-lg flex-col noty">
      <div className="flex  items-center text-left">
        <div className="flex justify-center items-center px-2 text-red-500">
          <iconify-icon icon="ph:warning-fill"></iconify-icon>
        </div>
        <div className="text-red-500">Warning</div>
      </div>
      <div className="mx-2 text-sm text-orange-400">Vui lòng điền đầy đủ thông tin</div>
    </div>
  );
}

export default NotyModal;
