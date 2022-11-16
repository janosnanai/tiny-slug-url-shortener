import type { CreateLinkInput } from "../../schema/link.schema";

import { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";

import ButtonPrimary from "../ui/button-primary";
import ButtonSecondary from "../ui/button-secondary";
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
    reset,
    formState: { errors: validationErrors, isSubmitting },
  } = useForm<CreateLinkInput>({
    mode: "onTouched",
    resolver: zodResolver(createLinkSchema),
    defaultValues,
  });

  // Sync defaultvalues on open
  useEffect(() => {
    if (!isOpen) return;
    reset(defaultValues);
  }, [defaultValues, isOpen, reset]);

  function handleGenerate() {
    setValue("slug", nanoid(7), { shouldValidate: true });
  }

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <Dialog.Panel className="w-full max-w-md overflow-y-auto rounded-lg bg-zinc-900 p-4 shadow-lg">
          <div className="mb-9 flex justify-between">
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
            <div className="space-y-9">
              <div className="space-y-1">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg text-zinc-400">{BASE_URL}</span>
                    <input
                      disabled={isSubmitting}
                      autoComplete="off"
                      type="text"
                      placeholder="enter slug or generate one..."
                      {...register("slug")}
                      className={`grow rounded-lg border bg-zinc-1000 px-2 py-1 text-zinc-100 ${
                        validationErrors.slug
                          ? "border-red-500"
                          : "border-zinc-800"
                      }`}
                    />
                  </div>
                  <p className="h-4 text-right text-xs font-semibold tracking-wide text-red-500">
                    {validationErrors.slug?.message}
                  </p>
                </div>
                <ButtonSecondary
                  onClick={handleGenerate}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  generate
                </ButtonSecondary>
              </div>
              <div>
                <input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="text"
                  placeholder="enter your url..."
                  {...register("url")}
                  className={`w-full rounded-lg border bg-zinc-1000 px-2 py-1 text-zinc-100 ${
                    validationErrors.url ? "border-red-500" : "border-zinc-800"
                  }`}
                />
                <p className="-mb-4 h-4 text-right text-xs font-semibold tracking-wide text-red-500">
                  {validationErrors.url?.message}
                </p>
              </div>
              <div>
                <textarea
                  disabled={isSubmitting}
                  rows={5}
                  placeholder="enter description... (optional)"
                  {...register("description")}
                  className="max-h-64 min-h-[5rem] w-full rounded-lg border border-zinc-800 bg-zinc-1000 px-2 py-1 text-zinc-100"
                />
                <p className="-mb-4 h-4 text-right text-xs font-semibold tracking-wide text-red-500">
                  {validationErrors.description?.message}
                </p>
              </div>
              <ButtonPrimary
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                submit
              </ButtonPrimary>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default FormModal;
