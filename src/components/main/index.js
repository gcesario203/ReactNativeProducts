import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native'
import CurrencyInput from 'react-native-currency-input';
import NumericInput from 'react-native-numeric-input'
import Style from './styles.js'
import { Feather } from '@expo/vector-icons'
import Api from '../../services/api.js'

export default function Main() {
    const [id, setId] = useState(0)
    const [produtos, setProdutos] = useState([])
    const [totalPreco, setTotalPreco] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [preco, setPreco] = useState(0)
    const [quantidade, setQuantidade] = useState(0)
    const [nome, setNome] = useState('')

    const clearValues = () => {
        setPreco(0)
        setId(0)
        setQuantidade(0)
        setNome('')
    }

    const deleteProduct = async (id) => 
    {
        await Api.delete(`produtos/${id}`)

        await loadProducts()
    }

    const handleProductId = async (id = 0) => {
        if (id > 0) {
            const product = await Api.get(`produtos/${id}`)

            setId(product.data.produto.id)
            setNome(product.data.produto.nome)
            setPreco(product.data.produto.preco)
            setQuantidade(product.data.produto.quantidade)
        }
        else {
            clearValues()
        }

        setModalVisible(!modalVisible)
    }

    const handleProductsTotalValue = (produto) => {
        let auxTotal = 0
        for (let i = 0; i < produto.length; i++) {
            auxTotal += produto[i].quantidade * produto[i].preco
        }

        return auxTotal
    }

    const handleProductPost = async (id = 0) => {
        Number.parseInt(id)
        if (id === 0) {
            const newProduct =
            {
                nome,
                preco,
                quantidade
            }

            await Api.post('produtos', newProduct)
        }
        else {
            const updatedProduct =
            {
                id,
                nome,
                preco,
                quantidade
            }

            await Api.put(`produtos/${id}`, updatedProduct)

            
        }
        await loadProducts()

        setModalVisible(!modalVisible)
    }

    const loadProducts = async () => {
        const lProdutos = await Api.get('produtos')

        setTotalPreco(handleProductsTotalValue(lProdutos.data.produtos))

        setProdutos([...lProdutos.data.produtos])
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <View style={Style.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View>
                    <View>
                        <TextInput
                            value={nome}
                            onChangeText={setNome}
                        />
                        <CurrencyInput
                            value={preco}
                            onChangeValue={setPreco}
                            unit="$"
                            delimiter=","
                            separator="."
                            precision={2}
                        />
                        <NumericInput
                            value={quantidade}
                            onChange={setQuantidade}
                            totalWidth={240}
                            totalHeight={50}
                            iconSize={25}
                            step={1}
                            minValue={0}
                            valueType='integer'
                            rounded
                            textColor='#B0228C'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='#EA3788'
                            leftButtonBackgroundColor='#E56B70'
                        />
                        <TouchableOpacity style={Style.btnBox}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>
                    {id > 0 ? <TouchableOpacity style={Style.btnBox} onPress={() => handleProductPost(id)}>
                        <Text>Editar produto</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity> : <TouchableOpacity style={Style.btnBox} onPress={() => handleProductPost()}>
                        <Text>Adicionar produto</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>}
                </View>
            </Modal>
            <FlatList
                data={produtos}
                keyExtractor={lProduto => String(lProduto.id)}
                onEndReachedThreshold={0.2}
                renderItem={({ item: lProduto }) => (
                    <View style={Style.productBox}>
                        <View>
                            <TouchableOpacity style={Style.closeBtn} onPress={() => deleteProduct(Number.parseInt(lProduto.id))}>
                                <Feather name="x" size={16} color="#e02041" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={Style.contentValue}>
                                <Text>ONG:</Text>
                                <Text>{lProduto.nome}</Text>
                            </View>

                            <View style={Style.contentValue}>
                                <Text>Caso:</Text>
                                <Text>{lProduto.quantidade}</Text>
                            </View>


                            <View style={Style.contentValue}>
                                <Text>Valor:</Text>
                                <Text>
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                        .format(lProduto.preco)}
                                </Text>
                            </View>


                            <TouchableOpacity style={Style.btnBox} onPress={() => handleProductId(Number.parseInt(lProduto.id))}>
                                <Text>Editar produto</Text>
                                <Feather name="arrow-right" size={16} color="#e02041" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            >

            </FlatList>

            <Text>Preço dos produtos</Text>
            <Text>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                    .format(totalPreco)}
            </Text>
            <TouchableOpacity style={Style.btnBox} onPress={() => handleProductId(0)}>
                <Text>Adicionar produto</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
        </View>
    )
}