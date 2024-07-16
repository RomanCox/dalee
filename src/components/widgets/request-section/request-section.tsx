"use client";

import { useGSAP } from "@gsap/react";
import { useWindowWidth } from "@react-hook/window-size";
import gsap from "gsap";
import { memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/button/button";
import Icon from "@/components/ui/icon";
import Input from "@/components/ui/input/input";
import Toast from "@/components/ui/toast/toast";

import { RequestService } from "@/services/request";
import { TRequestSection } from "@/types/request.type";
import styles from "./request-section.module.scss";

export type TRequestForm = {
  name: string;
  phone: string;
};

interface RequestSectionProps {
  isClearErrors?: boolean;
  requestSection?: TRequestSection;
}

export const RequestSection = memo(
  ({ isClearErrors, requestSection }: RequestSectionProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [toastOpened, setToastOpened] = useState(false);
    const [serverError, setServerError] = useState(false);

    const width = useWindowWidth();

    const toast = useRef(null);

    useEffect(() => {
      if (width > 767) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }, [width]);

    useGSAP(
      () => {
        if (toastOpened) {
          gsap.to(toast.current, {
            autoAlpha: 1,
            y: "0rem",
          });

          setTimeout(() => {
            gsap.to(toast.current, {
              duration: 1,
              autoAlpha: 0,
              onComplete: () => {
                setToastOpened(false);
              },
            });
          }, 4000);
        } else {
          gsap.to(toast.current, {
            autoAlpha: 0,
            onComplete: () => {
              setToastOpened(false);
            },
          });
        }
      },
      { dependencies: [toastOpened] },
    );

    const {
      register,
      formState: { errors },
      clearErrors,
      reset,
      handleSubmit,
    } = useForm<TRequestForm>();

    const onSubmit = async (data: TRequestForm) => {
      const response = await RequestService.send({
        chat_id: process.env.NEXT_PUBLIC_CHAT_ID,
        text: `<b>Новая заявка</b>\n\nИмя: <b>${
          data.name
        }</b>\nТелефон: <b>${data.phone.replaceAll(
          " ",
          "",
        )}</b>\n\n<b>Страница отправки</b>:\n${window.location}\n\n#заявка`,
        parse_mode: "HTML",
        link_preview_options: {
          isDisabled: true,
        },
      });

      if (!response.ok) {
        setServerError(true);
        return;
      }

      setToastOpened(true);
      reset();
    };

    useEffect(() => {
      if (isClearErrors) {
        clearErrors();
      }
    }, [clearErrors, isClearErrors]);

    useEffect(() => {
      if (serverError) {
        setTimeout(() => setServerError(false), 5000);
      }
    }, [serverError]);

    return (
      <section className={styles.section}>
        <header className={styles.header}>
          <h2 className={styles.title}>{requestSection?.title}</h2>
          <p className={styles.description}>{requestSection?.description}</p>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            icon={<Icon name="user" height="34" width="34" />}
            placeholder="Ваше имя"
            {...register("name", { required: "Это поле обязательно" })}
            error={errors.name?.message}
          />
          <Input
            type="phone"
            icon={<Icon name="phone" height="34" width="34" />}
            placeholder="Ваш номер телефона"
            {...register("phone", { required: "Это поле обязательно" })}
            error={errors.phone?.message}
          />
          <Button type="submit" className={styles.button}>
            Отправить заявку
            {!isMobile && <Icon name="arrow-down" width="52" height="52" />}
          </Button>
        </form>

        {serverError && (
          <small className={styles.error}>
            Произошла непредвиденная ошибка
          </small>
        )}

        {requestSection?.successMessage && (
          <Toast ref={toast} text={requestSection?.successMessage} />
        )}
      </section>
    );
  },
);

RequestSection.displayName = "RequestSection";
