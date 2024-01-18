import { Button } from "@/components/ui/button";
import { appWindow } from "@tauri-apps/api/window";

export function WindowsControls() {
  const handleCloseClick = () => {
    appWindow.close();
  };

  const handleMinimizeClick = () => {
    appWindow.minimize();
  };

  const handleMaximizeClick = () => {
    appWindow.maximize();
  };

  const MenuBarWrapped = (
    <div className="flex items-center">
      <div>
        {/* Minimize Icon */}
        <Button
          onClick={handleMinimizeClick}
          variant="ghost"
          className="h-9 rounded-none px-3.5"
          style={{ display: "inline-block" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="6" width="8" height="1.5"></rect>
          </svg>
        </Button>

        {/* Maximize Icon */}
        <Button
          onClick={handleMaximizeClick}
          variant="ghost"
          className="h-9 rounded-none px-3.5"
          style={{ display: "inline-block" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="10" height="10" rx="1.5" ry="1.5"></rect>
          </svg>
        </Button>

        {/* Close Icon */}
        <Button
          variant="ghost"
          className="h-9 rounded-none px-3.5"
          onClick={handleCloseClick}
          style={{ display: "inline-block" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="4" x2="4" y2="12"></line>
            <line x1="4" y1="4" x2="12" y2="12"></line>
          </svg>
        </Button>
      </div>

      {/* <div className="flex space-x-2">
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
              fill="#ED6A5F"
            />
          </svg>{" "}
        </div>
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
              fill="#F5BF4F"
            />
          </svg>
        </div>
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
              fill="#61C554"
            />
          </svg>
        </div>
      </div> */}
    </div>
  );

  return <>{MenuBarWrapped}</>;
}
