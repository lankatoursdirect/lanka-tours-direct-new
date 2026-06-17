import { Toaster as Sonner } from "sonner";



const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]-background group-[.toaster]-foreground group-[.toaster]-border group-[.toaster]-lg",
          description: "group-[.toast]-muted-foreground",
          actionButton: "group-[.toast]-primary group-[.toast]-primary-foreground",
          cancelButton: "group-[.toast]-muted group-[.toast]-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };











