'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { authClient } from '@/lib/auth/client';
import { User } from '@/types/user';
import {State, City} from 'country-state-city'
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { register } from 'module';
import { toast, ToastContainer } from 'react-toastify';

const schema = zod.object({
  phone: zod
    .string({ required_error: 'Mobile number is required' })
    .trim()
    .regex(/^[6-9]\d{9}$/, {
      message: 'Enter a valid 10-digit mobile number',
    }),
  pincode: zod
    .string()
    .regex(/^\d{6}$/, { message: 'Pincode must be exactly 6 digits' }),
  address: zod.string().min(1, { message: 'Email is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Enter a valid email address' }),
  state: zod.string({ required_error: 'State is required' }),
  city: zod.string({ required_error: 'City is required' })


 
 
});

type Values = zod.infer<typeof schema>;
 


export function AccountDetailsForm(): React.JSX.Element {
  const [userd, setUser] = React.useState<User | null>(null);


  const clinet = userd || { fname: '', lname: '', email: '', };
  //console.log('clinet', clinet);
  React.useEffect(() => {
    authClient.getUser().then((result) => {
      setUser(result.data ?? null);
      if (result.data) {
      reset({
        phone: typeof result.data.phone === 'string' ? result.data.phone : '',
        address: typeof result.data.address === 'string' ? result.data.address : '',
        pincode: typeof result.data.pincode === 'string' ? result.data.pincode : '',
        email: typeof result.data.email === 'string' ? result.data.email : '',
        state: typeof result.data.state === 'string' ? result.data.state : '',
        city: typeof result.data.city === 'string' ? result.data.city : '',
        // etc.
      });
    }
      //console.log('user', result.data?.city);
    });
  }, []);

 const defaultValues = {
  email: '',
  state: '',
  city: '',
  pincode: '',
  address: '',
  phone: ''
};
 
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const { control, handleSubmit, setError, formState: { errors }, reset, watch, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  // Track the previous state value
const prevState = React.useRef<string>("");

React.useEffect(() => {
  const currentState = watch("state");
  // Only reset city if state changed after initial load
  if (prevState.current && prevState.current !== currentState) {
    setValue("city", "");
  }
  prevState.current = currentState;
}, [watch("state"), setValue]);
  



const onSubmit: SubmitHandler<Values> = React.useCallback(
  async (values) => {
    setIsPending(true);
    const { error } = await authClient.profile(values);

    if (error) {
      setError('root', { type: 'server', message: error });
      toast.error(error); // Show error toast
      setIsPending(false);
      return;
    }

    // Refresh the auth state
    await checkSession?.();
    router.refresh();

    toast.success("Profile updated successfully!"); // Show success toast
    setIsPending(false);
  },
  [checkSession, router, setError]
);



  return (
    <>
      <form
       onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <FormControl fullWidth required>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput value={clinet.fname}  label="First name"  />
                </FormControl>
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <FormControl fullWidth required>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput value={clinet.lname}   label="Last name"  />
                </FormControl>
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <FormControl fullWidth required>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput value={clinet.email}  label="Email address" name="email" />
                </FormControl>
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >

         <Controller
                 control={control}
                 name="phone"
                 render={({ field }) => (
                   <FormControl error={Boolean(errors.phone)} fullWidth>
                     <InputLabel>Phone</InputLabel>
                     <OutlinedInput
                       type="text"
                       label="Phone"
                       {...field} // automatically uses value + onChange
                     />
                     {errors.phone && (
                       <FormHelperText>{errors.phone.message}</FormHelperText>
                     )}
                   </FormControl>
                 )}
               />

                 </Grid>
                <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >

                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.address)} fullWidth>
                      <InputLabel>Address</InputLabel>
                      <OutlinedInput
                        type="text"
                        label="Address"
                        {...field} // automatically uses value + onChange
                        
                      />
                      {errors.address && (
                        <FormHelperText>{errors.address.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                
  </Grid>
             
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
            <FormControl error={Boolean(errors.state)}  fullWidth>
              <InputLabel>State</InputLabel>
              <Select  label="State"
                
                variant="outlined"
                {...field}
              >
                {State.getStatesOfCountry('IN').map((state) => (
                  
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
               {errors.state && (
                    <FormHelperText>{errors.state.message}</FormHelperText>
                  )}
            </FormControl>
            )}
            />
          </Grid>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <Controller
          control={control}
          name="city"
            render={({ field }) => (
           <FormControl  error={Boolean(errors.city)} fullWidth>
              <InputLabel>City</InputLabel>
               <Select
               label="City"
              {...field}
            value={ field.value || ""}
            onChange={e => field.onChange(e.target.value)}
             disabled={!watch("state")}
    >
      {(City.getCitiesOfState('IN', watch("state") || "") || []).map((city) => (
        <MenuItem key={city.name} value={city.name}>
          {city.name}
        </MenuItem>
      ))}
    </Select>
    {errors.city && (
                    <FormHelperText>{errors.city.message}</FormHelperText>
                  )}
        </FormControl>
      )}
      />
          </Grid>
  <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <Controller
                control={control}
                name="pincode"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.pincode)} fullWidth>
                    <InputLabel>PinCode</InputLabel>
                    <OutlinedInput
                      type="text"
                      label="PinCode"
                      {...field} // automatically uses value + onChange
                      
                    />
                    {errors.pincode && (
                      <FormHelperText>{errors.pincode.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
           
          </Grid>


        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button disabled={isPending} type="submit" variant="contained">Save details</Button>
       
      </CardActions>
    </Card>
  </form>
  <ToastContainer position="top-right" autoClose={3000} />
</>
  );
}
export default AccountDetailsForm;