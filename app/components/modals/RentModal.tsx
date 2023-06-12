'use client';

import useRentModal from '@/app/hooks/useRentModal';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import { categories } from '../navbar/Categories';
import Modal from './Modal';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const LoginModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((currentStep) => currentStep - 1);
  };
  const onNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place" subtitle="Pick a category" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subtitle="Help guests find you" />
        <CountrySelect onChange={(value) => setCustomValue('location', value)} />
        <Map center={location?.latlng} />
      </div>
    );
  }

  // const footerContent = (
  //   <div className="flex flex-col gap-4 mt-3">
  //     <hr />
  //     <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
  //     <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />

  //     <div className="text-neutral-500 text-center mt-4 font-light">
  //       <div className="justify-center flex flex-row items-start gap-2">
  //         <div>First time using Airbnb?</div>
  //         <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline ">
  //           Create an account
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <Modal
      // disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default LoginModal;
