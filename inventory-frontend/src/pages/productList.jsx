import {
  Button,
  Group,
  Stack,
  TextInput,
  Title,
  Table,
  Badge,
  Pagination,
  MultiSelect,
  Card,
  Flex,
  Box,
  Divider,
Grid
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../utills/notification';
import { deleteProduct, getCategories, getProducts } from '../api/productService';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../utills/deleteCommonModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRotateLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
const [triggerSearchKey, setTriggerSearchKey] = useState(0);

  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };
  const navigate = useNavigate();
  const limit = 5;

  const fetchProducts = async () => {
    try {
      const res = await getProducts({
        page: activePage,
        limit,
        search,
        categories: selectedCategories,
      });
 
      setProducts(res.data.data.data);
      setTotalPages(res.data.data.pages || 1);
    } catch (err) {
      notifyError(err.message || 'Failed to fetch products');
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await getCategories();
      const categoryOptions = res?.data?.data.map((cat) => ({
        label: cat.name,
        value: cat._id,
      }));
      setCategoriesList(categoryOptions);
    } catch (err) {
      notifyError('Failed to fetch categories');
    }
  };

 const confirmDelete = async () => {
  try {
    await deleteProduct(selectedProductId);
    notifySuccess('Product deleted successfully');
    setDeleteModalOpen(false);
    setSelectedProductId(null);
    fetchProducts();
  } catch (err) {
    notifyError(err.message || 'Delete failed');
  }
};

  const handleSearch = () => {
    setActivePage(1);
     setTriggerSearchKey(prev => prev + 1);
   
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategories([]);
    setActivePage(1);
     setTriggerSearchKey(prev => prev + 1);
  };

 

  useEffect(() => {
    fetchAllCategories();
  }, []);
useEffect(() => {
  fetchProducts();
}, [triggerSearchKey, activePage]);

  return (
    <>
    <Box maw={1200} mx="auto">
      <Flex justify="space-between" align="center" mb="lg" style={{marginTop: '3rem'}}>
        <Title order={3}>Product List</Title>
         <Button 
               leftSection={<FontAwesomeIcon icon={faPlus} />}
              variant="light"
               onClick={() => navigate('/product/add')}
            >
              Add Product
            </Button>
      </Flex>

    
        <Stack spacing="md" mb="md">
      <Stack spacing="md">
  <Grid gutter="md">
    <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
      <TextInput
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Grid.Col>
    <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
      <MultiSelect
        placeholder="Filter by categories"
        data={categoriesList}
        value={selectedCategories}
        onChange={setSelectedCategories}
      />
    </Grid.Col>
    <Grid.Col span={{ base: 6, sm: 3, md: 2, lg: 2 }}>
      <Button 
        variant="light" 
        onClick={handleReset} 
        color="gray"
        fullWidth
        leftSection={<FontAwesomeIcon icon={faRotateLeft} />}
      >
        Reset
      </Button>
    </Grid.Col>
    <Grid.Col span={{ base: 6, sm: 3, md: 2, lg: 2 }}>
      <Button 
        onClick={handleSearch}
        fullWidth
         leftSection={<FontAwesomeIcon icon={faSearch} />}
      >
        Search
      </Button>
    </Grid.Col>
  </Grid>
</Stack>
        </Stack>
     

      <Card withBorder shadow="sm" p="0" radius="md" mt="xl">
        <Table striped highlightOnHover>
          <Table.Thead style={{ backgroundColor: '#e6f4ff' }}>
            <Table.Tr>
              <Table.Th style={{ padding: '12px' }}>Name</Table.Th>
              <Table.Th>Categories</Table.Th>
              <Table.Th>Added On</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
           <Table.Tbody>
            {products.length > 0 ? (
              products.map((product) => (
                
                <Table.Tr key={product._id}>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>
                    <Group spacing="xs">
                      {product?.categories.map((cat) => (
                        <Badge key={cat._id} color="blue" radius="sm">
                          {cat?.name}
                        </Badge>
                      ))}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    {new Date(product.createdAt).toLocaleDateString('en-IN')}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      color="red"
                      size="xs"
                      variant="light"
                      onClick={() => openDeleteModal(product._id)}
                      leftSection={<FontAwesomeIcon icon={faTrash} />}
                    >
                      Delete
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>
                  No products found.
                </Table.Td>
              </Table.Tr>
            )}
            </Table.Tbody>
        
        </Table>
      </Card>

    
        <Pagination
          value={activePage}
          onChange={setActivePage}
          total={totalPages}
          mt="lg"
          position="center"
        />
     
    </Box>
    <DeleteConfirmationModal
  opened={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={confirmDelete}
  title="Delete Product"
  message="Are you sure you want to delete this product?"
/>

    </>
  );
};

export default ProductList