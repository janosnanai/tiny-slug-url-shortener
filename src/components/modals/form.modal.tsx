import type { CreateLinkInput } from "../../schema/link.schema";

import { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { createLinkSchema } from "../../schema/link.schema";
import { env } from "../../env/client.mjs";

const BASE_URL = `${
  process.env.NODE_ENV === "development" ? "http://" : "https://"
}${env.NEXT_PUBLIC_VERCEL_URL}/s/`;

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: CreateLinkInput) => void;
  title: string;
  defaultValues?: { slug: string; url: string; description: string };
}

function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  defaultValues,
}: FormModalProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors: validationErrors },
  } = useForm<CreateLinkInput>({
    mode: "onTouched",
    resolver: zodResolver(createLinkSchema),
  });

  // Sync defaultvalues on open
  useEffect(() => {
    if (!isOpen) return;
    let slug = "";
    let url = "";
    let description = "";

    if (defaultValues) {
      ({ slug, url, description } = defaultValues);
    }
    setValue("slug", slug);
    setValue("url", url);
    setValue("description", description);
  }, [defaultValues, isOpen, setValue]);

  function handleGenerate() {
    setValue("slug", nanoid(7), { shouldValidate: true });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <Dialog.Panel className="w-full max-w-md overflow-y-auto rounded-lg bg-zinc-900 p-4 shadow-lg">
          <div className="mb-5 flex justify-between">
            <Dialog.Title className="text-2xl uppercase text-zinc-100">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-zinc-600 transition hover:text-zinc-300"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div>
                <div className="flex items-center">
                  <span className="text-lg text-zinc-400">{BASE_URL}</span>
                  <input
                    type="text"
                    placeholder="enter slug or generate one..."
                    {...register("slug")}
                    className="grow rounded-lg border border-zinc-800 bg-zinc-1000 px-2 py-1 text-zinc-100"
                  />
                </div>
                <p>{validationErrors.slug?.message}</p>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="w-full rounded-lg border-2 border-violet-600 bg-black/25 p-2 text-center text-lg font-semibold uppercase text-violet-100 transition duration-300 hover:bg-violet-600"
                >
                  generate
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="enter your url..."
                  {...register("url")}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-1000 px-2 py-1 text-zinc-100"
                />
                <p>{validationErrors.url?.message}</p>
              </div>
              <div>
                <textarea
                  rows={5}
                  {...register("description")}
                  className="max-h-64 min-h-[5rem] w-full rounded-lg border border-zinc-800 bg-zinc-1000 px-2 py-1 text-zinc-100"
                />
                <p>{validationErrors.description?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg border-2 border-pink-600 bg-pink-600 px-5 py-2 text-center text-lg font-semibold uppercase text-pink-100 transition duration-300 ease-out hover:bg-black/25"
              >
                submit
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default FormModal;
