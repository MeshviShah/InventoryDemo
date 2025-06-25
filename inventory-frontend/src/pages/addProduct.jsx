import { addProduct, getCategories } from "../api/productService";
import {
  Button,
  Group,
  MultiSelect,
  Stack,
  TextInput,
  Textarea,
  Title,
  NumberInput,
  Box,
  Grid,
  SimpleGrid,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from "../utills/notification";
import { faArrowLeft, faPaperPlane, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';

const AddProduct = () => {

  const [categoriesList, setCategoriesList] = useState([]);
   const form = useForm({
    initialValues: {
      name: '',
      description: '',
      quantity: '',
      categories: [],
    },
    validate: {
      name: (value) => (value?.trim().length === 0 ? 'Product name is required' : null),
      quantity: (value) =>
      !Number.isInteger(Number(value)) || value <= 0
      ? 'Quantity must be a greater than zero'
      : null,
      categories: (value) =>
        !value || value.length === 0 ? 'Select at least one category' : null,
    },
  });
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      const catOptions = res?.data?.data.map((cat) => ({
        label: cat.name,
        value: cat._id,
      }));
      setCategoriesList(catOptions);
      
    } catch (err) {
      notifyError('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    // console.log(values,"valu")
    try {
      const payload = {
         name: values?.name?.trim(),
        description: values.description?.trim(),
        categories: values.categories,
        quantity: Number(values.quantity),
      };
     
      const resp = await addProduct(payload);
      // console.log(resp)
      form.reset();
      notifySuccess('Product added successfully');
      navigate('/products');
      
    } catch (err) {
      notifyError(err.message || 'Failed to add product');
    }
  };

  return (
    <Box maw={1200} mx="auto" mt="lg">
     <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          <Group position="apart">
            <Title order={3}>Add New Product</Title>
          </Group>

         <Grid gutter="lg">
           <Grid.Col span={{ base: 12, sm: 12, lg: 4 }}> <TextInput
              label="Product Name"
              withAsterisk
              placeholder="Enter product name"
              {...form.getInputProps('name')}
            /></Grid.Col>
            <Grid.Col span={{ base: 12, sm: 12, lg: 5 }}>
            <MultiSelect
              label="Categories"
              withAsterisk
              placeholder="Select categories"
              data={categoriesList}
              clearable
              searchable
              {...form.getInputProps('categories')}
            /></Grid.Col> 
           <Grid.Col span={{ base: 12, sm: 12, lg: 3 }}>
            <NumberInput
              label="Quantity"
              withAsterisk
              placeholder="e.g. 99"
              min={1}
              
              precision={2}
              {...form.getInputProps('quantity')}
            /></Grid.Col> 
           
       
          <Grid.Col span={{ base: 12, sm: 12, lg: 12 }}>
          {/* Second Row: Description */}
          <Textarea
            label="Description"
            placeholder="Write a short description"
            autosize
            minRows={2}
            maxRows={4}
            {...form.getInputProps('description')}
          />
          </Grid.Col>
             </Grid>
          <Group position="right" mt="md">
          <Button
          variant="outline"
          color="gray"
          onClick={() => navigate('/products')}
          leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
        >
          Back
        </Button>
            <Button type="submit"  leftSection={<FontAwesomeIcon icon={faSave} />}>Submit</Button>
          </Group>
         
        </Stack>
      </form>
    </Box>
  );
};


export default AddProduct