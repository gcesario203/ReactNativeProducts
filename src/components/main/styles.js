import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#333738',
        paddingVertical: 30,
    },

    closeBtn: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },

    productBox: {
        backgroundColor: '#635B6C',
        marginBottom: 16,
        paddingHorizontal: 20,
        borderRadius: 8
    },

    textBoxProperty: {
        color: '#B4B5BE'
    },

    valueBoxProperty: {
        color: '#B18742'
    },

    contentValue: {
        flexDirection: 'row',
        padding: 6
    },

    totalValue:
    {
        alignItems: 'center',
        marginBottom: 5,
    },

    btnBox: {
        flexDirection: 'row',
        backgroundColor: '#B18742',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 8,
        width: '100%'
    },
    textPropDark: {
        color: 'white'
    },

    modalContext: {
        marginHorizontal: 20,
    },

    modalBox: {
        backgroundColor: '#635B6C',
        paddingHorizontal: 20,
        marginHorizontal:20,
        borderRadius: 8,
        marginTop:'50%'
    },

    inputAlign:{
        alignItems:'center'
    },
    modalBtn: {
        flexDirection: 'row',
        backgroundColor: '#B18742',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 8,

    },
})